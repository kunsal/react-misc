export default function ConceptualTable ({data, theadColumns, tbodyKeys}) {
    const conceptualTableClasses = ['table-success', 'table-info', 'table-warning', 'table-primary'];

    const getTableClassIndex = (idx) => {
        const classesLength = conceptualTableClasses.length;
        if (idx < classesLength) return idx; 
        while (idx >= classesLength) {
            idx = idx - classesLength;
        }
        return idx;
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                {theadColumns.map(th => (<th key={th}>{th}</th>))}
                </tr>
            </thead>
            <tbody> 
            {data.length > 0 && 
                data.map((dt, idx) => (
                    <tr key={dt[idx]} className={conceptualTableClasses[getTableClassIndex(idx)]}>
                        {tbodyKeys.map(td => {
                            return typeof dt[td] !== 'object' ? 
                                <td>{dt[td]}</td> : 
                                <td>{JSON.stringify(dt[td])}</td>
                        })}
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}