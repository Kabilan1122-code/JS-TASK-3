window.onload = function () {
    var prices = [150, 180, 130];
    var bookings = [];
    var nextId = 1;
    var selects = document.querySelectorAll(".ticketbook select");
    var movieSelect = selects[0];
    var timeSelect = selects[1];
    var inputs = document.querySelectorAll(".ticketbook input");
    var emailInput = inputs[0];
    var ticketInput = inputs[1];
    var bookBtn = document.getElementById("bookbtn");
    var resetBtn = document.getElementById("resetbtn");
    var totalSpan = document.querySelector(".ticketbook span");
    var countSpan = document.querySelector(".yourbook span");
    var message = document.createElement("p");
    message.className = "message";
    document.querySelector(".ticketbook").appendChild(message);
    var bookBody = document.createElement("div");
    bookBody.className = "bookbody";
    var searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search by movie name...";
    var bookingList = document.createElement("div");
    bookBody.appendChild(searchInput);
    bookBody.appendChild(bookingList);
    document.querySelector(".yourbook").appendChild(bookBody);
    function updateTotal() {
        var tickets = Number(ticketInput.value);
        var price = prices[movieSelect.selectedIndex];
        if (tickets > 0) {
            totalSpan.innerHTML = price * tickets;
        } else {
            totalSpan.innerHTML = 0;
        }
    }

    function cancelBooking(id) {
        for (var i = 0; i < bookings.length; i++) {
            if (bookings[i].id == id) {
                bookings.splice(i, 1);
                break;
            }
        }
        showBookings();
        
    }

    function showBookings() {
        var search = searchInput.value.trim().toLowerCase();
        bookingList.innerHTML = "";
        countSpan.innerHTML = bookings.length;


        var found = 0;
        for (var i = 0; i < bookings.length; i++) {
            var b = bookings[i];

            if (b.movie.toLowerCase().includes(search)) {
                found++;

                var card = document.createElement("div");
                card.className = "bookcard";
                card.innerHTML =
                    "<h5>" + b.movie + "</h5>" +
                    "Show Time: " + b.time + "<br>" +
                    "Email: " + b.email + "<br>" +
                    "Tickets: " + b.tickets + "<br>" +
                    "Total: ₹" + b.total + "<br>";

                var cancelBtn = document.createElement("button");
                cancelBtn.className = "cancelBtn";
                cancelBtn.innerHTML = "Cancel";
                cancelBtn.setAttribute("data-id", b.id);
                cancelBtn.onclick = function () {
                    cancelBooking(this.getAttribute("data-id"));
                };

                card.appendChild(cancelBtn);
                bookingList.appendChild(card);
            }
        }
    }

    function bookTickets() {
        var movie = movieSelect.options[movieSelect.selectedIndex].text;
        var time = timeSelect.value;
        var email = emailInput.value.trim();
        var tickets = Number(ticketInput.value);
        var booking = {id: nextId,
            movie: movie,
            time: time,
            email: email,
            tickets: tickets,
            total: prices[movieSelect.selectedIndex] * tickets
        };
        nextId++;
        bookings.push(booking);

        showBookings();
    }

    function resetForm() {
        movieSelect.selectedIndex = 0;
        timeSelect.selectedIndex = 0;
        emailInput.value = "";
        ticketInput.value = "";
        totalSpan.innerHTML = 0;
    }

    movieSelect.onchange = updateTotal;
    ticketInput.oninput = updateTotal;
    searchInput.oninput = showBookings;
    bookBtn.onclick = bookTickets;
    resetBtn.onclick = function () {
        resetForm();
        hideMessage();
    };

    showBookings();
};
