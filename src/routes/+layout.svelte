<script lang="ts">
    import "../app.css";
    import Link from "./link.svelte";
</script>

<header class="font-bold rounded-lg m-2 h-10 bg-gray-300">
	<ul class="flex justify-around pt-2 text-gray-700">
		<Link href="/">Caller ID</Link>
		<Link href="/graphana">Graphana</Link>
		<Link href="/voron">Voron</Link>
		<Link href="/mqtt">MQTT</Link>
		<Link target="__VoronPi__" href="https://192.168.1.89:4200">[VoronPi]</Link>
		<Link target="__ZeroBlocker__" href="https://192.168.1.231:4200">[ZeroBlocker]</Link>
		<Link target="__NodeRedPi__" href="https://192.168.1.210:4200">[NodeRedPi]</Link>
		<Link target="__Synology__" href="https://synology:5001">[Synology]</Link>
	</ul>
</header>
<slot />
