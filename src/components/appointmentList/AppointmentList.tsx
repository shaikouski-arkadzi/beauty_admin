import { useContext, useEffect, useState, useCallback } from "react";

import AppointmentItem from "../appointmentItem/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function AppointmentList() {
	const {
		activeAppointments,
		getActiveAppointments,
		appointmentLoadingStatus,
		calendarDate
	} = useContext(AppointmentContext);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0);

	useEffect(() => {
		getActiveAppointments();
	}, [calendarDate]);

	const handleOpenModal = useCallback((id: number)=>{
		setIsOpen(true);
		selectId(id);
		document.body.style.overflow = 'hidden';
	},[])

	if (appointmentLoadingStatus === "loading") {
		return <Spinner />;
	} else if (appointmentLoadingStatus === "error") {
		return (
			<>
				<Error />
				<button className="schedule__reload" onClick={getActiveAppointments}>
					Try to reload
				</button>
			</>
		);
	}

	return (
		<>
			{activeAppointments.map((item) => {
				return (
					<AppointmentItem
						{...item}
						key={item.id}
						openModal={handleOpenModal}
					/>
				);
			})}
			<CancelModal
				handleClose={setIsOpen}
				selectedId={selectedId}
				isOpen={isOpen}
			/>
		</>
	);
}

export default AppointmentList;