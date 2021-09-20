export const SAVES = "saves"
export const AUTOSAVE = "autosave"

const loadAllSaves = () => {
    try {
        const serializedSaves = localStorage.getItem(SAVES);
        if (serializedSaves === null) {
            return undefined
        }
        return JSON.parse(serializedSaves)
    } catch (err) {
        return undefined
    }
}

export const loadState = (save) => {
    const saves = loadAllSaves()
    if (saves) {
        return saves[save]
    }
}

export const saveState = (state, save) => {
    var saves = loadAllSaves()
    if (!saves) {
        saves = {}
    }
    saves[save] = state
    localStorage.setItem(SAVES, JSON.stringify(saves))
}