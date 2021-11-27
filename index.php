<?php
    $root = $_SERVER['REQUEST_URI'];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soft Cake</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
    <link rel="stylesheet" href="<?= $root ?>public/styles/global.css">
    <link rel="stylesheet" href="<?= $root ?>style.css">
    <script src="https://kit.fontawesome.com/7cbb7ae6e7.js" crossorigin="anonymous"></script>
</head>
<body>
    <?php require('./components/header/header.php'); ?>
    <main>
        <div id="principal">
            <div class="conteudo">
                <h1>Soft Cake</h1>
                <p>O Soft Cake é um site de vendas de bolos veganos, com diversas opções de personalização.</p>
            </div>
            <a href="#informacoes">
                <i class="fa-solid fa-angles-down"></i>
            </a>
        </div>
        <div id="informacoes">
            <div class="card">
                <div class="icone">
                    <i class="fas fa-clock"></i>
                </div>
                <h2>10:00 am - 7:00 pm</h2>
                <p>Horário comercial</p>
            </div>
            <div class="card">
                <div class="icone">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h2>10:00 am - 7:00 pm</h2>
                <p>Horário comercial</p>
            </div>
            <div class="card">
                <div class="icone">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <h2>10:00 am - 7:00 pm</h2>
                <p>Horário comercial</p>
            </div>
        </div>
        <div id="unidades">
            <h3>Unidades</h3>
            <div id="mapa"></div>
            <a href="./unidades">Ver lista completa ></a>
        </div>
    </main>
    <script>
        const mapa = L.map('mapa').setView([-23.5439192, -46.8327736,17], 15)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa)

        const icone = L.icon({
            iconUrl: './public/images/map-marker.svg',
            iconSize: [50, 58],
            iconAnchor: [29, 58],
        })

        function adicionarMarker({ id, name, lat, lng }) {
            const popup = L.popup({
                closeButton: false,
                className: 'map-popup',
                minHeight: 35,
                offset: [1, -55]
            }).setContent(
                `${name} <a href="./unidades?id=${id}"> > </a>`
            )

            L.marker([lat, lng], { icon: icone }).addTo(mapa).bindPopup(popup)
        }

        const unidades = [
            {
                id: 1,
                name: 'Carapicuíba',
                lat: -23.5439192,
                lng: -46.8327736,
            }
        ];

        unidades.forEach((unidade) => {
            adicionarMarker(unidade)
        });
    </script>
</body>
</html>