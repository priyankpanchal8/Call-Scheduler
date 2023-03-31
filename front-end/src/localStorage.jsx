export const loadState = () => {
    try{

        const storedState = localStorage.getItem("state");
        if (storedState === null)
        {
            return undefined;
        }
        var state = JSON.parse(storedState);
        return state;

    }
    catch (err)
    {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        localStorage.setItem("state",JSON.stringify(state));
    }
    catch (err)
    {
        console.error(err);
    }
}