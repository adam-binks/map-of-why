import React from 'react';
import { SAVES } from '../../app/localstorage';

export function MenuButtons() {
    const [selectedOption, setSelectedOption] = useState(null)
    options = localStorage.getItem(SAVES) // TODO get savenames

    return <div>
        <button>Save</button>
        <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
        />
    </div>
}