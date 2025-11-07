import { useState, useEffect } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Você clicou ${count} vezes`;
    }, [count]);


    return (
        <>
            <p>Você clicou {count} vezes</p>
            <button className="btn-link btn-active" onClick={() => setCount(count + 1)}>
                Contar + {count}
            </button>
        </>
    )
}