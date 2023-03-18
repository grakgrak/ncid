<script lang="ts">
</script>

<header>
<nav>
	<ul>
		<li><a href="/">Caller ID</a></li>
		<li><a href="/graphana">Graphana</a></li>
		<li><a href="/voron">Voron</a></li>
		<li><a href="/mqtt">MQTT</a></li>
		<li><a target="__VoronPi__" href="https://192.168.1.89:4200">[VoronPi]</a></li>
		<li><a target="__ZeroBlocker__" href="https://192.168.1.231:4200">[ZeroBlocker]</a></li>
		<li><a target="__NodeRedPi__" href="https://192.168.1.210:4200">[NodeRedPi]</a></li>
		<li><a target="__Synology__" href="https://synology:5001">[Synology]</a></li>
	</ul>
</nav>
</header>
<slot />

<style>
header {
    background-color: white;
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 10px;
    font-weight: bold;
}

header * {
    display: inline;
}

li {
    margin: 20px;
}

a {
    color: black;
    text-decoration: none;
    padding: 5px;
}

a:hover {
    border-radius: 5px;
    background-color: cadetblue;
    color: whitesmoke;
}

a:active {
    color: blue;
}
</style>
