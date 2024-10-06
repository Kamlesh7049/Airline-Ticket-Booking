
document.addEventListener('DOMContentLoaded', () => {
    const flightForm = document.getElementById('flightForm');
    const bookingTableBody = document.querySelector('#bookingTable tbody');


    loadBookings();

    
    flightForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newBooking = {
            from: flightForm.from.value,
            to: flightForm.to.value,
            departure: flightForm.departure.value,
            return: flightForm.return.value || 'N/A',
            passengers: flightForm.passengers.value,
            class: flightForm.class.value
        };

        addBooking(newBooking);
        flightForm.reset();
    });

    function loadBookings() {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.forEach((booking, index) => {
            displayBooking(booking, index);
        });
    }


    function addBooking(booking) {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        displayBooking(booking, bookings.length - 1);
    }

    
    function displayBooking(booking, index) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.from}</td>
            <td>${booking.to}</td>
            <td>${booking.departure}</td>
            <td>${booking.return}</td>
            <td>${booking.passengers}</td>
            <td>${booking.class}</td>
            <td class="actions">
                <button onclick="editBooking(${index})">Edit</button>
                <button onclick="deleteBooking(${index})">Delete</button>
            </td>
        `;
        bookingTableBody.appendChild(row);
    }

    
    window.editBooking = function(index) {
        const bookings = JSON.parse(localStorage.getItem('bookings'));
        const booking = bookings[index];
    
        flightForm.from.value = booking.from;
        flightForm.to.value = booking.to;
        flightForm.departure.value = booking.departure;
        flightForm.return.value = booking.return === 'N/A' ? '' : booking.return;
        flightForm.passengers.value = booking.passengers;
        flightForm.class.value = booking.class;
        
    
        deleteBooking(index);
    }


    window.deleteBooking = function(index) {
        const bookings = JSON.parse(localStorage.getItem('bookings'));
        bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        bookingTableBody.innerHTML = ''; 
        loadBookings(); 
    }
});