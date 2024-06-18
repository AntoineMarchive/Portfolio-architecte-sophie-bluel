export async function getWorks() {
   const response = await fetch("http://localhost:5678/api/works") // interroger le serveur
   const works = await response.json() // si reponse ok, on aura les données
   return works // renvois les works
}