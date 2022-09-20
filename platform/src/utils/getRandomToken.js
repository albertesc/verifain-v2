export default function getRandomToken () {
  const rand = () => Math.random().toString(36).substring(2)
  const token = () => rand() + rand()
  return token()
}
