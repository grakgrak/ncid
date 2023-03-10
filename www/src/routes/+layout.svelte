<script lang="ts">
</script>

<header>
<span class='title'>NCID Caller ID</span>
<nav>
	<ul>
		<li><a href="/">home</a></li>
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

.title {
    margin-left: 1em;
    font-weight: bold;
}
</style>
