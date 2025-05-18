export const calculateColor = (score: number) => {
    if (score > 4){
        return 'rgb(22 163 74)'
    } if (score > 3) {
        return 'rgb(234 179 8)'
    } if (score > 2) {
        return 'rgb(249 115 22)'
    } if (score > 1) {
        return 'rgb(239 68 68)'
    } else {
        return 'rgb(126 34 206)'
    }
}

export const calculateLevelInCourse = (level: number) => {
    switch (level){
        case 1:
            return 'green'
        case 2:
            return 'yellow'
        case 3:
            return 'orange'
        case 4: 
            return 'red'
        case 5:
            return "purple"
    }
}



//TODO TALVEZ COLOCAR COMO VARIAVEIS PARA SER MAIS RAPIDO DE MUDAR