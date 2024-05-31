type ConceptualTableType = {
    data: Record<string, any>,
    theadColumns: string[],
    tbodyKeys: string[]
}

export default function ConceptualTable ({data, theadColumns, tbodyKeys}: ConceptualTableType) {
    const conceptualTableClasses = ['table-success', 'table-info', 'table-warning', 'table-primary'];

    const getTableClassIndex = (idx: number) => {
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
                data.map((dt:any, idx:number) => (
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