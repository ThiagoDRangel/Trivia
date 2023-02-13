import md5 from 'crypto-js/md5';

export default function returnHash(value) {
  const hash = md5(value);
  return hash.toString();
}
