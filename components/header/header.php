<?php
    $root = $_SERVER['REQUEST_URI'];
?>

<header>
    <a href="#navbar">
        <i class="fas fa-bars"></i>
    </a>
    <img src="<?= $root ?>public/images/logo.svg" alt="Soft Cake">
    <div id="navbar">
        <ul>
            <li>Catálogo</li>
            <li>Sobre nós</li>
            <li class="logo">
                <img src="<?= $root ?>public/images/logo.svg" alt="Soft Cake">
            </li>
            <li>Unidades</li>
            <li>
                <?php if(isset($_SESSION['']))  {?>
                    <!-- <button>Login</button> -->
                <?php } else { ?>
                    <button>Login</button>
                <?php } ?>
            </li>
        </ul>
        <a class="background" href="#"></a>
    </div>
</header>