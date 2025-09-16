import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import GenerateEvents from './GenerateEvents'; 
import EventUploadForm from './EventUploadForm';
import GenerateCertificates from './GenerateCertificates'; 
import GenerateLetters from './GenerateLetters'; // Importa GenerateLetters (actualizado)

const MainDashboard = () => {
    const [events, setEvents] = useState([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);
    const location = useLocation();
    
    // Determinar qué página estamos mostrando
    const isLettersPage = location.pathname === '/generar-carta';
    const isCertificatesPage = location.pathname === '/generar-certificado';

    const fetchEvents = useCallback(async () => {
        setIsLoadingEvents(true);
        try {
            const response = await fetch('https://relaticpanama.org/api/get_events.php');
            const data = await response.json();
            if (data.success) {
                setEvents(data.events);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setIsLoadingEvents(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleLettersCreated = useCallback(() => {
        // Lógica adicional después de crear cartas si es necesario
        console.log('Cartas creadas exitosamente');
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8">
            {/* Página de Certificados - Muestra todos los componentes */}
            {isCertificatesPage && (
                <>
                    <GenerateEvents onEventsCreated={fetchEvents} /> 
                    <EventUploadForm events={events} isLoading={isLoadingEvents} onAssetsUploaded={fetchEvents} />
                    <GenerateCertificates events={events} isLoading={isLoadingEvents} />
                </>
            )}

            {/* Página de Cartas - Solo muestra el componente de cartas */}
            {isLettersPage && (
                <GenerateLetters
                    events={events} 
                    isLoading={isLoadingEvents}
                    onLettersCreated={handleLettersCreated}
                />
            )}
        </div>
    );
};

export default MainDashboard;