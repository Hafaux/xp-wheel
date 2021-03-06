import Assets from '../core/AssetManager';
import Scene from './Scene';
import { Text } from 'pixi.js';
import config from '../config';

export default class Splash extends Scene {
  constructor() {
    super();

    this.loadingText = new Text('0%', {
      fontSize: 75,
      fill: 0xffc900,
    });

    this.config = config.scenes.Splash;

    this.loadingText.anchor.set(0.5);
    this.loadingText.x = this.width / 2;
    this.loadingText.y = this.height / 2;
    this.addChild(this.loadingText);
  }

  get finish() {
    return new Promise((res)=>setTimeout(res, this.config.hideDelay));
  }

  preload() {
    const images = {
      logo: Assets.images.logo,
      flap: Assets.images.flap,
      sector1: Assets.images.sector1,
      sector2: Assets.images.sector2,
      star: Assets.images.star,
      wheel: Assets.images.wheel,
    };
    const sounds = {
      spinningWheel: Assets.sounds.spinningWheel, // Credit: https://www.youtube.com/channel/UCA8luKdJ7MAFj4-LB3gFjXQ
      spinning: Assets.sounds.spinning,
      spinComplete: Assets.sounds.spinComplete,
      wheelTick: Assets.sounds.wheelTick,
    };

    return super.preload({ images, sounds });
  }

  onResize(width, height) { // eslint-disable-line no-unused-vars
    this.loadingText.x = width / 2;
    this.loadingText.y = (height / 2) + 500;
  }

  onLoadProgress(val) {
    this.loadingText.text = `${val}%`;
  }
}
