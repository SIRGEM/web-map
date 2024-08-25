<script>
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';

    let markers_position = [
        [-31.44146561060643, -64.19316654865654],
        [-31.43826082308847, -64.1933846882900],
        [-31.43420345093465, -64.18607029718518],
    ];
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