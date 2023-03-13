<script lang="ts">
</script>

<header>
<nav>
	<ul>
		<li><a href="/">Caller ID</a></li>
		<li><a href="/graphana">Graphana</a></li>
		<li><a href="/test">test</a></li>
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

header li {
    margin: 20px;
}

header li a {
    color: black;
    text-decoration: none;
}
</style>
