---
title: How to run Matomo in a Docker container while passing database credentials as environment variables
description: If you’re using Docker to run Matomo, you might want to keep your credentials out of the Docker image, because they may vary depending on deployment situations, or because the image is publicly available.
pubDate: 2020-01-17
heroImage: https://cdn-images-1.medium.com/max/8064/1*-iGWtTqpcZgvix1DTgrqUA.jpeg
language: en
---

In the open-source, privacy focused, web analytics software [Matomo](https://matomo.org/), database credentials are stored in the `config/config.ini.php` file.

If you’re using [Docker](https://www.docker.com/) to run Matomo, you might want to keep your credentials out of the Docker image, because they may vary depending on deployment situations, or because the image is publicly available. One solution for this is to remove the config file from the image and mount it at runtime using the `--volume` argument.

But it’s likely that only the database credentials change and the many remaining configuration options are identical whether you’re developing locally or deploying in production. A solution for this is to keep your config file in the Docker image, while removing only the database credentials from it and passing them to the docker container as environment variables at run time. This is made easy but [EnvironmentVariables](https://plugins.matomo.org/EnvironmentVariables) plugin.

This tutorial is based on my [biblys/analytics](https://github.com/biblys/analytics) project.

## 1. Dockerfile

Here’s an example Dockerfile (you might already have your own) :

```Dockerfile
# Extend the official Matomo Docker image
FROM matomo:3.13.0

# Install unzip
RUN apt update && apt install -y unzip

# Download, unzip and install the EnvironmentVariables plugin
RUN curl -o EnvironmentVariables.zip \
      https://plugins.matomo.org/api/2.0/plugins/EnvironmentVariables/download/latest \
      && unzip EnvironmentVariables.zip \
      && rm EnvironmentVariables.zip \
      && mv EnvironmentVariables /usr/src/matomo/plugins

# Bring along our personalized Matomo config file
COPY config.ini.php /usr/src/matomo/config/config.ini.php
```

## 2. Matomo config file

Now we need to remove all database credentials from our `config.ini.php`file. The database section should then look like this:

```
[database]
tables_prefix = "matomo_"
```

I chose to remove `host`, `port`, `username`, `password` and `dbname` but to leave in the config file `tables_prefix`, as this setting should not vary. But it’s totally up to you which settings you want to keep in the config file and which ones you need to pass as environment variables.

By default, an installed plugin is not activated. We can activate it from the Matomo dashboard, but for this we need to login and thus… we need database connection. Fortunatly, Matomo just add an entry into the Plugins[] array of the config file, so we can do this manually.

```
[Plugins]
(...)
Plugins[] = "Intl"
Plugins[] = "Marketplace"
Plugins[] = "ProfessionalServices"
Plugins[] = "UserId"
Plugins[] = "EnvironmentVariables" # <= add this line
```

Our config file is ready and now doesn’t contain any sensitive information, so we can include it our public Docker image or a public git repository (be sure to check that this is true for you, as mine also contain SMTP credentials).

## 3. Build Docker image

Our Docker image is now ready to be built:

```
docker build -t my-custom-matomo .
```

Nothing fancy at this step. This will create our custom Matomo image, including the EnvironmentVariables plugin and our config file. Be sure that your custom config file is in the current directory when running this.

## 4. Run Docker image

We can now our Docker image while passing database credentials as environment variables.

The EnvironmentVariables plugin follows this convention to read env var: `MATOMO_$CATEGORY_$SETTING`. This means the `host` setting in the `database` section should be passed as a `MATOMO_DATABASE_HOST` env var.

One way to pass an environment variable to `docker run` is to [use the `-e` argument](https://docs.docker.com/engine/reference/run/#env-environment-variables), so passing our `host` and `port` setting would look like this:

```
docker run -d -p 8080:80 \
  --env "MATOMO_DATABASE_HOST=mydbhost.somecloud.com" \
  --env "MATOMO_DATABASE_PORT=3354" \
  my-custom-matomo
```

But a better way, in my opinion, is to create an `.env` file to include our credentials. In our case, it would look something like:

```
MATOMO_DATABASE_HOST=mydbhost.somecloud.com
MATOMO_DATABASE_PORT=3354
MATOMO_DATABASE_USERNAME=my-user-name
MATOMO_DATABASE_PASSWORD=r4NdomCh4r4CT3R2
MATOMO_DATABASE_DBNAME=my-custom-matomo
```

Now we just need to include this file in the current directory when we run `docker run` and pass it to docker with the `--env-file` argument.

```
docker run -d -p 8080:80 \
  --env-file=.env \
  my-custom-matomo
```

And _voila_!

## 5. Bonus!

As mentioned, there might be some other setting that we don’t want to include in a publicly shared config file, like SMTP credentials. We can add them to the `.env` file following the same convention.

```
MATOMO_MAIL_HOST=mail.somemailprovider.com
MATOMO_MAIL_POST=465
MATOMO_MAIL_USERNAME=my-user-name
MATOMO_MAIL_PASSWORD=r4NdomCh4r4CT3R2
```

etc.

Is also like to add the `force_ssl` setting so I can only enforce SSL in production. Sadly, a current limitation, at the time of writing, of the EnvironmentVariables plugin is that configuration arrays are not supported, although it would be very useful to set `trusted_hosts` only in production.

Also, it’s worth noting that settings passed as environment variables override settings from the config file, so you could leave your local, non-sensitive, development database credentials in the file and only override them in production with env vars.
