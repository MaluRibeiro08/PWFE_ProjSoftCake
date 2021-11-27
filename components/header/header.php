<?php
    $root = explode('/', $_SERVER['REQUEST_URI'])[1];
?>

<header>
    <a href="#navbar">
        <i class="fas fa-bars"></i>
    </a>
    <a href="/<?= $root ?>" class="logo">
        <img src="/<?= $root ?>/public/images/logo.svg" alt="Soft Cake">
    </a>
    <div id="navbar">
        <ul>
            <li><a href="/<?= $root ?>">Catálogo</a></li>
            <li><a href="/<?= $root ?>/sobre-nos">Sobre nós</a></li>
            <li class="logo">
                <a href="/<?= $root ?>">
                    <img src="/<?= $root ?>/public/images/logo.svg" alt="Soft Cake">
                </a>
            </li>
            <li><a href="/<?= $root ?>/unidades">Unidades</a></li>
            <li>
                <?php if(isset($_SESSION['']))  {?>
                    
                <?php } else { ?>
                    <button onclick="window.location='/<?= $root ?>/autenticacao/login'">Login</button>
                <?php } ?>
            </li>
        </ul>
        <a class="background" href="#"></a>
    </div>
</header>