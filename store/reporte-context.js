import { createContext, useState } from "react";
import { TurboModuleRegistry } from "react-native";

export const ReporteContext = createContext({
    reportes:[],
    addReporte:(reporte)=>{},
    editReporte:(id, reporte)=>{},
    deleteReporte:(id)=>{},
    modifyReportes:(list)=>{}

})


function ReporteContextProvider({children}){

    const [reportes, setReportes] = useState([])

    function addReporte(reporte){
        setReportes([...reportes, reporte])
    }

    function deleteReporte(id){
        setReportes(reportes.filter((item)=>item.id!==id));
    }

    function editReporte(id, reporte){
        const r = reportes.find((item)=>item.id===id);
        
        setReportes(reportes.map(item=>{
            if(item.id === r.id){
                item.name = reporte.name
            }
            return item
        }))
    }

    function modifyReportes (list){
        setReportes(list)
    }

    const value = {
        reportes:reportes,
        addReporte:addReporte,
        deleteReporte:deleteReporte,
        editReporte:editReporte,
        modifyReportes: modifyReportes
    }

    return <ReporteContext.Provider value={value}>
        {children}
    </ReporteContext.Provider>
}

export default ReporteContextProvider;