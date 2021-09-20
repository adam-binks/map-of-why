import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Creatable from 'react-select/creatable';
import { getSaveNames, loadState, saveState } from '../../app/localstorage';
import { AUTOSAVE_PROPS } from '../../app/store';
import { activeProjectUpdated, selectActiveProject } from '../navigation/navigationSlice';
import { projectLoaded } from '../nodes/nodesSlice';
import styles from './Menu.module.css';

export function MenuButtons() {
    const dispatch = useDispatch()
    const options = getSaveNames().map(save => {return {value: save, label: save}})

    
    const changeProject = (selection) => {
        // these two dispatches are on different slices so aren't atomic
        // that means an autosave could happen between them and overwrite the old project!
        // so pause autosaving while we do these things :)
        AUTOSAVE_PROPS['paused'] = true
        dispatch(projectLoaded({loadedNodes: loadState(selection.value)}))
        dispatch(activeProjectUpdated({activeProject: selection.value}))
        AUTOSAVE_PROPS['paused'] = false
    }
    
    const nodes = useSelector(state => state.nodes)
    const createDuplicateProject = (newProject) => {
        // TODO - fix the new project not showing up in the Select. maybe instead of onCreateOption just do it all in changeProject and check if save exists
        saveState(nodes, newProject) // save the existing nodes to the new project
        dispatch(activeProjectUpdated({activeProject: newProject}))
    }

    const activeProject = useSelector(selectActiveProject)

    return <div className={styles.menuDiv}>
        <Creatable
            className={styles.select}
            defaultValue={{value: activeProject, label: activeProject}}
            onChange={changeProject}
            onCreateOption={createDuplicateProject}
            options={options}
        />
    </div>
}