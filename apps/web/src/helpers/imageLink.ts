const ANNUERIE_BASE="https://annuaire-entreprise.inetpsa.com/photos"

export function urlImage(identifiant: string){
    const caseIdentfiant = identifiant.toUpperCase()

    return `${ANNUERIE_BASE}/${caseIdentfiant[0]}/${caseIdentfiant.slice(1,2)}/${caseIdentfiant}`
}