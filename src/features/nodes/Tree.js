import React from 'react';
import { useSelector } from 'react-redux';
import { selectMaxDepth } from './nodesSlice';
import styles from './Tree.module.css';
import { Node } from './Node';
import { AddChildButton } from './AddChildButton';
import { node } from 'prop-types';

const targetWidth = 200 // ideally every node in the tree would be this width, to be readable

export function Tree() {
    const maxDepth = useSelector(selectMaxDepth)
    const focussedDepth = Math.min(useSelector(state => state.navigation.focussedDepth), maxDepth)
    const widthsByDepth = getWidthsByDepth(focussedDepth, maxDepth)
    const nodes = useSelector(state => state.nodes)

    const getDisplayedChildrenList = (current_depth, parent_id) => {
        var children;
        if (parent_id) {
            const parent = nodes.find(node => node.id === parent_id)
            children = parent.displayedChildren
        } else {
            children = nodes.filter(node => node.parents.length === 0).map(node => node.id)
        }

        const addChildButton = <li className={styles.treeElement} key={node.id + "_addChild"}><AddChildButton parent={node.id}  /></li>

        if (!children || children.length === 0) {
            return addChildButton
        }

        const list_elements = children.map((child, index) => {
            const grandchildren = getDisplayedChildrenList(current_depth + 1, child)
            
            const childNode = nodes.find(node => node.id === child)
            return (<li className={styles.treeElement} style={{...(childNode?.isValue ? {'--valueColour': childNode.valueColour} : {})}} key={child}>
                <Node
                    id={child}
                    key={child}
                    zoom={parseFloat(widthsByDepth[current_depth]) / parseFloat(targetWidth)}
                    width={widthsByDepth[current_depth]}
                    depth={current_depth}
                    index={index}
                />
                {grandchildren}
            </li>)
        })

        return <ul className={styles.treeElement + (parent_id === "root" ? " " + styles.tree : "")}>{list_elements} {addChildButton}</ul>
    }

    // setup re-render on screen resize
    const [, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    React.useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }, 200)
        window.addEventListener('resize', debouncedHandleResize)
        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    return (
        <div className={styles.treeContainer}>
            {getDisplayedChildrenList(0, 'root')}
        </div>
    )
}


const getWidthsByDepth = (focussedDepth, maxDepth) => {
    // calculate the widths of each depth of the nodes
    const numDepths = maxDepth + 1 // because depth is 0-indexed
    const padding = 100 // a bit of extra fudge to avoid it adding scrollbars

    const fullWidth = Math.min(document.documentElement.clientWidth, window.innerWidth) - padding
    const connectionWidth = 30
    var remainingWidth = fullWidth - numDepths * connectionWidth // work out how much space the nodes have

    var widthsByDepth = Array(numDepths)
    if (targetWidth * numDepths < remainingWidth) {
        widthsByDepth.fill(targetWidth) // everything is target width
        return widthsByDepth
    }

    // otherwise, apply faux fish-eye effect

    const adjacentShrinkFactor = 0.15 // proportion of gap between prev adjacent and non-adjacents
    const adjacentShrinkConstant = 10 // also need to shrink by a constant amount so we don't exceed screen width

    widthsByDepth[focussedDepth] = targetWidth
    remainingWidth -= targetWidth * 1.2 // add a bit of fudge

    var adjacents = [focussedDepth, focussedDepth]
    var remainingDepths = numDepths - 1
    var width = targetWidth

    while (adjacents[0] >= 0 || adjacents[1] < numDepths) {
        var equiWidth = remainingWidth / remainingDepths

        if (remainingDepths < 3) {
            width = equiWidth
        }

        adjacents[0]--
        adjacents[1]++
        const shrinkFactorBonus = (adjacents[0] >= 0 && adjacents[1]) < numDepths ? adjacentShrinkFactor : 0

        if (width > equiWidth) {
            width = width - ((width - equiWidth) * (adjacentShrinkFactor + shrinkFactorBonus) + adjacentShrinkConstant)
        }

        // this could be a failsafe V but ideally dont need it
        // if (width > remainingWidth) {
        //     width = remainingWidth
        // }

        for (let adj_i = 0; adj_i < adjacents.length; adj_i++) {
            const adjacent = adjacents[adj_i]
            if (adjacent >= 0 && adjacent < numDepths) {
                widthsByDepth[adjacent] = width
                remainingDepths--
                remainingWidth -= width
            }
        }
    }

    return widthsByDepth
}

export function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }