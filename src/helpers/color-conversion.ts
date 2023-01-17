export function hexStringToRgbArray(hexString: string) {
	const r = '0x' + hexString[1] + hexString[2];
	const g = '0x' + hexString[3] + hexString[4];
	const b = '0x' + hexString[5] + hexString[6];

	return [Number(r), Number(g), Number(b)];
}

export function rgbArrayToHslArray(rgbArray: number[]) {
	const [r, g, b] = [rgbArray[0] / 255, rgbArray[1] / 255, rgbArray[2] / 255];

	let cMin = Math.min(r, g, b);
	let cMax = Math.max(r, g, b);
	let delta = cMax - cMin;
	let [h, s, l] = [0, 0, 0];

	if (delta === 0) {
		h = 0;
	} else if (cMax === r) {
		h = ((g - b) / delta) % 6;
	} else if (cMax === g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}

	h = Math.round(h * 60);

	if (h < 0) {
		h += 360;
	}

	l = (cMax + cMin) / 2;

	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = Number((s * 100).toFixed(1));
	l = Number((l * 100).toFixed(1));

	return [h, s, l];
}

export function hexStringToHslArray(rgbString: string) {
	const rgbArray = hexStringToRgbArray(rgbString);
	const hslArray = rgbArrayToHslArray(rgbArray);

	return hslArray;
}
