import { useEffect } from 'react';

export const tryCatch = async (promise: Promise<any>) => {
    try {
        const data = await promise
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export const useClickOutside = (ref: any, handler: any) => {
    useEffect(() => {
        const listener = (event: any) => {
            if (event.targetTouches !== undefined) return
            const component = ref?.current;
            
            if (!component || component.contains(event.target)) return
            
            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}
// 

export const dragSidebar = (ref: any, openHandler: any, closeHandler: any) => {
    useEffect(() => {
        let initialX = 0
        let mouseX: any = undefined
        let isListening = false
        let dragSize = window.innerWidth / 5

        const initDrag = (event: any) => {
            // event.preventDefault()
            mouseX = event.targetTouches !== undefined ? event.targetTouches[0].pageX : event.pageX
            initialX = mouseX
            isListening = true
        }
        const dragHandler = (event: any) => {
            event.preventDefault()
            if (isListening == false) return
            mouseX = event.targetTouches !== undefined ? event.targetTouches[0].pageX : event.pageX


            if (mouseX - initialX < -dragSize) closeHandler()
            if (initialX > 50) return
            if (mouseX - initialX > dragSize) openHandler()
        }
        const stopListening = () => { isListening = false }

        document.addEventListener('mousedown', initDrag);
        document.addEventListener('touchstart', initDrag);
        document.addEventListener('mousemove', dragHandler);
        document.addEventListener('touchmove', dragHandler);
        document.addEventListener('mouseup', stopListening);
        document.addEventListener('touchend', stopListening);

        return () => {
            document.removeEventListener('mousedown', initDrag);
            document.removeEventListener('touchstart', initDrag);
            document.removeEventListener('mousemove', dragHandler);
            document.removeEventListener('touchmove', dragHandler);
            document.removeEventListener('mouseup', stopListening);
            document.removeEventListener('touchend', stopListening);
        };
    }, [ref, openHandler, closeHandler]);
}
export const constrain = (num: number, min: number, max: number): number => {
    return Math.max(Math.min(num, max), min);
}
export const createKeywords = (name: string) => {
    const arrayName: string[] = []
    let currentKeyword = ""
    name.split("").forEach(letter => {
        currentKeyword += letter
        arrayName.push(currentKeyword)
    });
    arrayName.unshift("")
    return arrayName
}
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const days_ES = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]

export const ENTER_KEYCODE = 13

const capitalLetters = 'A B C D E F G H I J K L M N O P Q R S T U V X Y Z '
const letters = 'a b c d e f g h i j k l m n o p q r s t u v x y z '
const numbers = '0 1 2 3 4 5 6 7 8 9'
const idCharacters = (capitalLetters + letters + numbers).split(" ")


export const customID = (length: number) => {
    let id = ""
    for (let index = 0; index < length; index++) {
        id += idCharacters[Math.floor(Math.random() * idCharacters.length)]
    }
    return id
}

export const regex = /[^0-9]/gi

export const getNextMonth = (date: string) => {
    let nextMonth: number | string = parseInt(date.slice(0, 2)) + 1
    nextMonth = nextMonth > 12 ? 1 : nextMonth
    nextMonth = nextMonth < 10 ? 0 + "" + nextMonth : nextMonth

    if (nextMonth == "01") {
        let year = parseInt(date.slice(6)) + 1
        return `${nextMonth}/1/${year}`
    }
    return `${nextMonth}${date.slice(2)}`
}

export const capEachWord = (sentence: string) => {
    if (!sentence) return ""
    const words = sentence.split(" ")
    for (let index = 0; index < words.length; index++) {
        words[index] = words[index][0].toUpperCase() + words[index].substr(1)
    }
    return words.join(" ")
}

export const getKeyByValue = (object: any, value: any) => {
    if (!object) return ""
    return Object.keys(object).find(key => object[key] == value)
}

export const getISOyear = (date: Date) => {
    return date.toISOString().slice(0, 4)
}
export const getISOmonth = (date: Date) => {
    return date.toISOString().slice(5, 7)
}
export const getISOyearMonth = (date: Date) => {
    return `${date.toISOString().slice(5, 7)}${date.toISOString().slice(0, 4)}`
}

export const incremetObjectValue = (object: any, value: string, amount: number) => {
    const objectProperty = object[`${value}`] || 0
    return {
        ...object,
        [`${value}`]: objectProperty + amount
    }
}
export const convertObjectToArray = (object: any) => {
    if (!object) return []
    const result = []
    for (const key in object) {
        result.push({ id: key, value: object[key] })
    }
    return result
}
export const getTime = (dateObject: Date = new Date()) => {
    let hour = dateObject.getHours()
    let minutes = dateObject.getMinutes()
    let ampm = "a.m."
    if (hour > 12) {
        hour -= 12
        ampm = "p.m."
    }
    if (hour == 0) hour = 12

    return `${hour}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`
}
// export default getTime
export const getDate = (dateObject: Date = new Date()) => {
    let day = dateObject.getDate()
    let month = dateObject.getMonth()
    let months = ['January', 'February', 'March', 'Aril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return ` ${day} ${months[month]}`
}
export const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : "";
}

type resolutionTypes = "" | "mq" | "hq" | "sd" | "maxres"
export const getYouTubeThumbnail = (videoID: string = "", resolution: resolutionTypes = "mq") => {
    return `https://i.ytimg.com/vi/${videoID}/${resolution}default.jpg`
}
export const twoDigitString = (number: number = 0) => {
    return number >= 10 ? `${number}` : "0" + number
}
export const secondsToMinutes = (seconds: number = 0) => {
    let finalSeconds = Math.floor(seconds % 60)
    let minutes = Math.floor((seconds % 3600) / 60)

    let result = `${twoDigitString(minutes)}:${twoDigitString(finalSeconds)}`

    return result
}

export const randomIndex = (x: any[]) => {
    if(!x) return 0

    return Math.floor(Math.random() * x.length)
}
export const randomRange = (x: number = 1, y?: number) => {
    if (!y) {
        return Math.random() * x
    }
    return Math.random() * (x - y) + x
}
export const randomInt = (x: number = 1, y?: number) => {
    if (!y) {
        return Math.floor(Math.random() * x)
    }
    return Math.floor(Math.random() * (x - y) + x)
}
export const objectToArray = (object: any = {}) => {
    const result: any[] = []
    Object.entries(object)
    .forEach((value: any) => {
        console.log(value);
        
        result.push({ name: value[0], qty: value[1].qty })
    })
    return result
}