import type { NextPage } from 'next';
import experiences, { ExperienceType } from '../data/experiences';
import Experience from '../components/Experience';
import Layout from '../components/Layout';

type HomeProps = {
  experiences: ExperienceType[];
};

const Home: NextPage<HomeProps> = ({ experiences }) => {
  return (
    <Layout>
      {experiences.map((experience: ExperienceType) => {
        return <Experience key={experience.slug} experience={experience} />;
      })}
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      experiences,
    },
  };
}

export default Home;
