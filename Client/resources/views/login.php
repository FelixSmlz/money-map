<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    <style>
    </style>
</head>

<body class="antialiased">
    <form action="javascript:login()">
        <div class="container">
            <label for="email"><b>E-Mail</b></label>
            <input type="text" name="email" id="email" value="felix@sae.de" required>

            <label for="password"><b>Password</b></label>
            <input type="password" name="password" id="password" value="1234" required>

            <button type="submit">Login</button>
        </div>
    </form>
    <div id="ergebnis1"></div>
    <div id="ergebnis2"></div>
    <div id="login_status">Ausgeloggt</div>

    <div>
        <button onclick="getAllExpenses()">Get all expenses</button>
        <div id="all_expenses"></div>
    </div>

    <script>
        function login() {
            fetch('http://localhost:8000/sanctum/csrf-cookie', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            }).then(function(resp) {

                fetch('http://localhost:8000/login', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN'),
                    },
                    body: JSON.stringify({
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value
                    }),
                    credentials: 'include'
                }).then(function(resp) {
                    ergebnis2.innerHTML = resp.status + ' - ' + resp.statusText;
                }).catch(function(e) {
                    ergebnis2.innerHTML = 'Fehler ' + e.stack;
                });

                return resp;
            }).then(function(resp) {
                ergebnis1.innerHTML = resp.status + ' - ' + resp.statusText;
                login_status.innerHTML = 'Eingeloggt';
            }).catch(function(e) {
                ergebnis1.innerHTML = 'Fehler ' + e.stack;
            });
        }

        function getAllExpenses() {
            fetch('http://localhost:8000/api/expenses/get-all', {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": getCookie('XSRF-TOKEN'),
                    },
                    credentials: 'include'
                })
                .then(response => response.json())
                .then(response => all_expenses.innerHTML = JSON.stringify(response))
                .catch(function(e) {
                    all_expenses.innerHTML = 'Fehler ' + e.stack;
                });
        }

        function getCookie(name) {
            const regex = new RegExp(`(^| )${name}=([^;]+)`);
            const match = document.cookie.match(regex);
            if (match) {
                return decodeURIComponent(match[2]);
            }
        }
    </script>
</body>

</html>