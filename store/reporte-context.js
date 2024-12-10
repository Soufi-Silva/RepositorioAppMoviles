import { createContext, useState } from "react";
import { TurboModuleRegistry } from "react-native";
import { removeReporte, updateReporte } from "../http";

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

    function editReporte(id, reporte) {
        const reporteOriginal = reportes.find((item) => item.id === id);
    
        if (reporteOriginal) {
            const reporteActualizado = {
                ...reporteOriginal,       
                name: reporte.name,       
                date: new Date().toISOString(), 
            };
    
            setReportes(reportes.map(item => item.id === id ? reporteActualizado : item));
    
            updateReporte(id, reporteActualizado);
        }
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