<script>
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
    import { onMount } from 'svelte';

    let markers_position = [];

    onMount(() => {
        console.log('Page loaded');
        get_marker_position();
    });

    function get_marker_position() {
        console.log('Getting markers position');
        fetch('/api/get_markers')
            .then(response => response.json())
            .then(data => {
                markers_position = data.markers;
            });
    }

    // Call get_marker_position every 1 second
    setInterval(get_marker_position, 5000);


</script>

<div style="width:100%;height:800px;">
	<Map
		options={{
			center: [-31.44146561060643, -64.19316654865654],
			zoom: 13
		}}
	>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
        {#each markers_position as position}
            <Marker latLng={position}>
                <Popup>
                    <div>
                        <h1>Marker</h1>
                        <p>Lat: {position[0]}</p>
                        <p>Lng: {position[1]}</p>
                    </div>
                </Popup>
            </Marker>
        {/each}
	</Map>
</div>