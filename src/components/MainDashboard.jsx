import  { useState, useEffect, useCallback } from 'react';
import GenerateEvents from './GenerateEvents'; 
import EventUploadForm from './EventUploadForm';
import GenerateCertificates from './GenerateCertificates'; // Importa el componente

const MainDashboard = () => {
    const [events, setEvents] = useState([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);

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

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8">
            <GenerateEvents onEventsCreated={fetchEvents} /> 
            <EventUploadForm events={events} isLoading={isLoadingEvents} onAssetsUploaded={fetchEvents} />
            <GenerateCertificates events={events} isLoading={isLoadingEvents} /> {/* Pasa las props aquí */}
        </div>
    );
};

export default MainDashboard;