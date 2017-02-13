import { trigger, state, style, transition, animate } from '@angular/core';

export const FLY_IN_OUT_ANIMATION = [
	trigger('flyInOut', [
		state('in', style({transform: 'translateX(0)'})),
		transition('void => *', [
			style({transform: 'translateX(-100%)'}),
			animate(200)
		]),
		transition('* => void', [
			animate(200, style({transform: 'translateX(100%)'}))
		])
	])
];