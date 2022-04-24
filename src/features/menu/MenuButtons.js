import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Creatable from 'react-select/creatable';
import { toast } from 'react-toastify';
import { getSaveNames, loadState, saveState } from '../../app/localstorage';
import { AUTOSAVE_PROPS } from '../../app/store';
import { activeProjectUpdated, selectActiveProject } from '../navigation/navigationSlice';
import { projectLoaded } from '../nodes/nodesSlice';
import styles from './Menu.module.css';

export function MenuButtons() {
    const dispatch = useDispatch()
    const saveNames = getSaveNames()

    
    const changeProject = (selection) => {
        // these two dispatches are on different slices so aren't atomic
        // that means an autosave could happen between them and overwrite the old project!
        // so pause autosaving while we do these things :)
        AUTOSAVE_PROPS['paused'] = true

        if (saveNames.includes(selection.value)) {
            // load existing project
            dispatch(projectLoaded({loadedNodes: loadState(selection.value)}))
            toast.success(`Loaded '${selection.value}'`)
        } else {
            // duplicate current project by saving as new project name
            // TODO disallow duplicate project names
            saveState(nodes, selection.value) // save the existing nodes to the new project
            toast.success(`Saved project as '${selection.value}'`)
        }
        dispatch(activeProjectUpdated({activeProject: selection.value}))

        AUTOSAVE_PROPS['paused'] = false
    }
    
    const nodes = useSelector(state => state.nodes)

    const activeProject = useSelector(selectActiveProject)

    return <div className={styles.menuDiv}>
        {/* <label htmlFor="loadProject">Load project</label>
        <Creatable
            inputId="loadProject"
            className={styles.select}
            defaultValue={{value: activeProject, label: activeProject}}
            onChange={changeProject}
            options={saveNames.map(save => {return {value: save, label: save}})}
        /> */}
    </div>
}