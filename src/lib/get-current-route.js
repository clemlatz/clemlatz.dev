export default function getCurrentRoute({ pathname }) {
  return pathname.match(/^\/(en|fr)\/(.*)/)[2];
}
