<script>
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
</script>

<div style="width:100%;height:800px;">
	<Map
		options={{
			center: [-31.44146561060643, -64.19316654865654],
			zoom: 13
		}}
	>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latLng={[-31.44146561060643, -64.19316654865654]} />
	</Map>
</div>