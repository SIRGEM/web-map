<script>
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
    import { onMount } from 'svelte';

    let markers_position = [];
    let localized_nodes = [];

    onMount(() => {
        console.log('Page loaded');
        get_marker_position();
    });

    function get_marker_position() {
        console.log('Getting markers position');
        fetch('http://0.0.0.0:8000/nodes')
            .then(response => response.json())
            .then(data => {
                // iterate over keys of data
                markers_position = [];
                localized_nodes = [];
                for (const key in data) {
                    // Check if dict has "position"
                    try {
                        if (data[key].position) {
                            console.log(data[key]);
                            let latitude = data[key].position.latitude;
                            let longitude = data[key].position.longitude;
                            if (latitude != undefined && longitude != undefined){
                                markers_position.push([latitude, longitude]);
                                localized_nodes.push(data[key]);
                            }
                        }
                    } catch (error) {
                        console.log('Error:', error);
                    }
                }
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
        {#each localized_nodes as nodes}
            <Marker latLng={[nodes.position.latitude, nodes.position.longitude]}>
                <Popup>
                    <div>
                        <h2>{nodes.user.longName}</h2>
                        <div>
                            <h3>user:</h3>
                            <ul>
                                <li>id: {nodes.id}</li>
                                <li>latitude: {nodes.position.latitude}</li>
                                <li>longitude: {nodes.position.longitude}</li>
                                <li>short name: {nodes.user.shortName}</li>
                            </ul>
                            <h3>Metrics:</h3>
                            <ul>
                                <li>airUtilTx {nodes.deviceMetrics.airUtilTx}</li>
                                <li> batteryLevel {nodes.deviceMetrics.batteryLevel}</li>
                                <li> channelUtilization {nodes.deviceMetrics.channelUtilization}</li>
                                <li> uptimeSeconds {nodes.deviceMetrics.uptimeSeconds}</li>
                                <li> voltage {nodes.deviceMetrics.voltage}</li>
                            </ul>
                        </div>
                    </div>
                </Popup>
            </Marker>
        {/each}
	</Map>
</div>