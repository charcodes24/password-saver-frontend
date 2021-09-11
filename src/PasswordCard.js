export default function Password({ password }) {
    const { id, key, chain } = password 
    

    return (
        <div>
            <p>{key}</p>
            <p>{chain}</p>
        </div>
    )
}