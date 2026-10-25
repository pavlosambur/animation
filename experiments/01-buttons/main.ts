import "../../shared/base.css";
import "./style.css";
import { applyMeta, requireElement } from "../../shared/experiment";
import { createLab } from "../../shared/lab";
import { EASE_OPTIONS } from "../../shared/motion";
import { setupLiquid, type LiquidParams } from "./liquid";
import { setupMagnetic, type MagneticParams } from "./magnetic";
import { meta } from "./meta";
import { setupSquish, type SquishParams } from "./squish";

// Starting values; replace them with whatever the panel's "Copy values" sends back.
const params: { magnetic: MagneticParams; liquid: LiquidParams; squish: SquishParams } = {
  magnetic: {
    strength: 0.35,
    labelStrength: 0.4,
    zone: 40,
    followDuration: 0.4,
    followEase: "power3.out",
    returnDuration: 0.9,
    returnAmplitude: 1,
    returnPeriod: 0.4,
  },
  liquid: {
    inDuration: 0.5,
    inEase: "power3.out",
    outDuration: 0.4,
    outEase: "power2.inOut",
  },
  squish: {
    hoverLift: 3,
    squashX: 1.08,
    squashY: 0.88,
    pressDuration: 0.12,
    releaseDuration: 0.7,
    releaseAmplitude: 1,
    releasePeriod: 0.35,
  },
};

applyMeta(meta);

const magneticZone = requireElement(".magnetic-zone");
const magneticButton = requireElement(".magnetic", magneticZone);
const { applyZone } = setupMagnetic(magneticZone, magneticButton, requireElement(".label", magneticButton), params.magnetic);

const liquidButton = requireElement(".liquid");
setupLiquid(liquidButton, requireElement(".liquid-fill", liquidButton), requireElement(".label", liquidButton), params.liquid);

setupSquish(requireElement(".squish"), params.squish);

const pane = createLab(meta.title, params);
const seconds = { min: 0, max: 2, step: 0.01 };
const springAmplitude = { min: 1, max: 3, step: 0.05 };
const springPeriod = { min: 0.1, max: 1, step: 0.01 };
const ease = { options: EASE_OPTIONS };

const magnetic = pane.addFolder({ title: "magnetic" });
magnetic.addBinding(params.magnetic, "strength", { min: 0, max: 1, step: 0.01 });
magnetic.addBinding(params.magnetic, "labelStrength", { min: 0, max: 1.5, step: 0.01 });
magnetic.addBinding(params.magnetic, "zone", { min: 0, max: 120, step: 1 }).on("change", applyZone);
magnetic.addBinding(params.magnetic, "followDuration", seconds);
magnetic.addBinding(params.magnetic, "followEase", ease);
magnetic.addBinding(params.magnetic, "returnDuration", seconds);
magnetic.addBinding(params.magnetic, "returnAmplitude", springAmplitude);
magnetic.addBinding(params.magnetic, "returnPeriod", springPeriod);

const liquid = pane.addFolder({ title: "liquid" });
liquid.addBinding(params.liquid, "inDuration", seconds);
liquid.addBinding(params.liquid, "inEase", ease);
liquid.addBinding(params.liquid, "outDuration", seconds);
liquid.addBinding(params.liquid, "outEase", ease);

const squish = pane.addFolder({ title: "squish" });
squish.addBinding(params.squish, "hoverLift", { min: 0, max: 12, step: 0.5 });
squish.addBinding(params.squish, "squashX", { min: 0.8, max: 1.3, step: 0.01 });
squish.addBinding(params.squish, "squashY", { min: 0.7, max: 1.2, step: 0.01 });
squish.addBinding(params.squish, "pressDuration", { min: 0, max: 0.5, step: 0.01 });
squish.addBinding(params.squish, "releaseDuration", seconds);
squish.addBinding(params.squish, "releaseAmplitude", springAmplitude);
squish.addBinding(params.squish, "releasePeriod", springPeriod);
