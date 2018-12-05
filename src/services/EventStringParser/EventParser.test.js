import EventStringParser from './index';

/**
 * @desc Crash cause fields timestamp and type
 * are mandatory for all events.
*/
it('Crash cause theres no type or timestamp in the invalid json string', () => {
	try{
		const str = `
			{timestamp: 56566, group: ['a', 'b', 'c'], select: ['a', 'b']}
			{type: 'data', timestamp: 556657, a: 1, b: 2}
			{type: 'stop', timestamp: 556657}
		`;
		const eventStringParser = new EventStringParser(str);
		eventStringParser.process();
	}catch(err){
		expect(err.message).toBe('The fields type and timestamp are required for all events.');
	}
});

/**
 * @desc Crash cause it is a invalid json
*/
it('Crash cause its a invalid json with no comma between a and b', () => {
	try{
		const str = `
			{type: 'start', timestamp: 56566, group: ['a', 'b', 'c'], select: ['a', 'b']}
			{type: 'data', timestamp: 556657, a: 1 b: 2}
			{type: 'stop', timestamp: 556657}
		`;
		const eventStringParser = new EventStringParser(str);
		eventStringParser.process();
	}catch(err){
		expect(err.message).toMatch(/JSON5: invalid character/);
	}
});


/**
 * @desc
 *
*/
it('Converts a JSON Relaxed String into a dataset array to be used in ChartJS', () => {
	const str = `
		{type: 'start', timestamp: 5656667, group: ['a', 'b', 'c'], select: ['d', 'e']}
		{type: 'span', timestamp: 5566577, begin: 454, end: 999999999}
		{type: 'data', timestamp: 5566577, d: 8, e: 7, a: 'zh', b: 'y', c: 'w'}
		{type: 'data', timestamp: 556657, d: 1, e: 2, a: 'z', b: 'y', c: 'w'}
		{type: 'stop', timestamp: 556657}
	`;
	const eventStringParser = new EventStringParser(str);
	eventStringParser.process();
	expect(eventStringParser.getList()).toHaveLength(1);
});