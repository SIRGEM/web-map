import { json } from '@sveltejs/kit';

let markers_position = [];

function get_random_position() {
    let lat = -31.44146561060643 + Math.random() * 0.01;
    let lon = -64.19316654865654 + Math.random() * 0.01;
    return [lat, lon];
}

export function GET() {
    markers_position.push(get_random_position());

    let response = {
        'markers': markers_position
    };

    return json(response);
}
