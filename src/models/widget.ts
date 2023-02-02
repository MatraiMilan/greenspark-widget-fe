export const ImpactTypes = {
    CARBON: 'carbon',
    PLASTIC_BOTTLES: 'plastic bottles',
    TREES: 'trees',
};

type WidgetAction = 'collects' | 'plants' | 'offsets';

type WidgetColor = 'white' | 'black' | 'blue' | 'green' | 'beige';

export interface Widget {
    id: number,
    type: keyof typeof ImpactTypes,
    amount: number,
    action: WidgetAction,
    active: boolean,
    linked: boolean,
    selectedColor: WidgetColor
}
