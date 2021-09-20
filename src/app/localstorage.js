export const SAVES = "saves"
export const AUTOSAVE = "autosave"
const LAST_ACTIVE_PROJECT = "last_active_project"

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

export const getSaveNames = () => {
    const saves = loadAllSaves()
    if (saves) {
        return Object.keys(saves)
    }
}

export const getLastActiveProject = () => {
    var project = localStorage.getItem(LAST_ACTIVE_PROJECT)
    if (project) {
        return project
    }

    const saves = getSaveNames()
    if (saves) {
        return saves[0]
    }

    return AUTOSAVE // default
}

export const setLastActiveProject = (lastActiveProject) => {
    localStorage.setItem(LAST_ACTIVE_PROJECT, lastActiveProject)
}