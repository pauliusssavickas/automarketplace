<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoMarket</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @vite(['resources/js/Pages/Header.jsx'])
    <link href="{{ asset('css/home.css') }}" rel="stylesheet">
    <link href="{{ asset('css/listings.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app"></div>
</body>
</html>
