// actions/resources.ts
import { Resource } from "@/lib/types"

// Fonction pour récupérer une ressource
export async function getResource(id: string): Promise<Resource | null> {
  // Si tu utilises une base de données
  // return await prisma.resource.findUnique({ where: { id } })
  
  // Pour l'instant, retourne un exemple
  return {
    id: id,
    title: "Exemple de ressource",
    description: "Description de la ressource",
    // Ajoute les autres champs selon ton type Resource
  }
}

// Fonction pour récupérer toutes les ressources
export async function getResources(): Promise<Resource[]> {
  return [
    {
      id: "1",
      title: "Ressource 1",
      description: "Description 1",
    },
    {
      id: "2",
      title: "Ressource 2",
      description: "Description 2",
    }
  ]
}
