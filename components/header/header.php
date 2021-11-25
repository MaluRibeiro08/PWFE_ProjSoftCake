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
            <li><a href="#">Catálogo</a></li>
            <li><a href="#">Sobre nós</a></li>
            <li class="logo">
                <img src="<?= $root ?>public/images/logo.svg" alt="Soft Cake">
            </li>
            <li><a href="#">Unidades</a></li>
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