import {
	Children,
	cloneElement,
	createRef,
	isValidElement,
	useEffect,
	useRef,
	useState,
} from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useDeepCompareEffectForMaps } from './utils';
import { Skeleton } from '../../skeleton';
import styles from './BaseMap.module.css';
import { classes } from '../../../utils';

const BaseMap = (props) => {
	// eslint-disable-next-line object-curly-newline
	const {
		loading,
		onClick,
		onIdle,
		children,
		style,
		mapId,
		clustered,
		fitBounds,
		theme,
		fallback,
		...options
	} = props;

	const ref = useRef(null);
	const markersRef = useRef([]);
	const [map, setMap] = useState();
	const [markerClusterer, setMarkerClusterer] = useState(null);
	const [activeInfoWindow, setActiveInfoWindow] = useState(null);

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					mapId,
					mapTypeControl: false,
					streetViewControl: false,
				})
			);
		}
	}, [map]);

	useEffect(() => {
		if (clustered && map && Children.count(children) > 0 && markersRef?.current?.length > 0) {
			if (markerClusterer) {
				markerClusterer.clearMarkers();
				setMarkerClusterer(null);
			}
			const markers = markersRef?.current?.map((marker) => {
				return marker.current;
			});

			// eslint-disable-next-line no-new
			setMarkerClusterer(
				new MarkerClusterer({
					map,
					markers,
				})
			);
		}
	}, [clustered, children, map]);

	const childCount = Children.count(children);

	useEffect(() => {
		if (fitBounds && map && childCount > 0) {
			const bounds = new google.maps.LatLngBounds();

			Children.forEach(children, (child) => {
				bounds.extend(
					new google.maps.LatLng(child.props.position.lat, child.props.position.lng)
				);
			});
			map.fitBounds(bounds);
		}
	}, [fitBounds, map, childCount]);

	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	useEffect(() => {
		if (map) {
			['click', 'idle'].forEach((eventName) => {
				return google.maps.event.clearListeners(map, eventName);
			});
			if (onClick) {
				map.addListener('click', onClick);
			}

			if (onIdle) {
				map.addListener('idle', () => {
					return onIdle(map);
				});
			}
		}
	}, [map, onClick, onIdle]);

	useEffect(() => {
		if (map) {
			['click', 'idle'].forEach((eventName) => {
				return google.maps.event.clearListeners(map, eventName);
			});
			if (onClick) {
				map.addListener('click', onClick);
			}

			if (onIdle) {
				map.addListener('idle', () => {
					return onIdle(map);
				});
			}
		}
	}, [map, onClick, onIdle]);

	return (
		<div className={classes(styles.root)}>
			<div
				ref={ref}
				style={
					loading
						? {
								flexGrow: 0,
						  }
						: style
				}
			/>
			{loading && (
				<Skeleton
					theme={theme}
					height='100%'
					variant='rounded'
					noAnimation={!loading && fallback}
				/>
			)}
			{Children.toArray(children)
				.filter((child) => {
					return isValidElement(child);
				})
				.map((child, index) => {
					if (index === 0) {
						markersRef.current = [];
					}
					if (isValidElement(child)) {
						const childRef = createRef();
						markersRef?.current?.push(childRef);
						// set the map prop on the child component
						return cloneElement(child, {
							map,
							ref: childRef,
							index,
							activeInfoWindow,
							setActiveInfoWindow,
						});
					}
					return null;
				})}
		</div>
	);
};

BaseMap.defaultProps = {
	loading: false,
	clustered: false,
	fitBounds: false,
	zoom: 1,
	center: {
		lat: 0,
		lng: 0,
	},
	theme: 'dark',
};

export default BaseMap;
