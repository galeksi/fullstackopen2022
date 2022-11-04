const Filter = ({ value, onChange }) => {
    const filterStyle = {
        marginBottom: 10
    }

    return (
        <div style={filterStyle}>
            Find countries: <input value={value} onChange={onChange} />
        </div>
    )
}

export default Filter