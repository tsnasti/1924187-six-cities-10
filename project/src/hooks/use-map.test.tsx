import useMap from './use-map';
import {renderHook} from '@testing-library/react';
import {makeFakeOffer} from '../test-mocks/test-mocks';
import {MutableRefObject} from 'react';
import {Map} from 'leaflet';

const fakeOffer = makeFakeOffer();
const {latitude, longitude, zoom} = fakeOffer.city.location;

jest.mock('leaflet');

describe('Hook: useMap', () => {
  it('should return map with correct location', () => {
    const mapRef = {
      current: {}
    } as MutableRefObject<HTMLElement>;

    const {result} = renderHook(() =>
      useMap(mapRef, fakeOffer.city),
    );

    expect(result.current).toBeInstanceOf(Map);
    expect(result.current?.setView).toBeCalledWith(
      {
        lat: latitude,
        lng: longitude,
      },
      zoom,
    );
  });
});
