import test from 'node:test';
import assert from 'node:assert/strict';
import { ERROR_PRESETS } from '../src/data/presets.js';
import { STORY_DATA } from '../src/data/storyData.js';

test('Presets data structure integrity', () => {
  assert.ok(Array.isArray(ERROR_PRESETS), 'ERROR_PRESETS should be an array');
  assert.ok(ERROR_PRESETS.length >= 4, 'Should have at least 4 compiler incident presets');

  for (const preset of ERROR_PRESETS) {
    assert.ok(preset.id, `Preset missing id`);
    assert.ok(preset.language, `Preset ${preset.id} missing language`);
    assert.ok(preset.title, `Preset ${preset.id} missing title`);
    assert.ok(typeof preset.line === 'number', `Preset ${preset.id} missing line number`);
    assert.ok(Array.isArray(preset.astFlow), `Preset ${preset.id} missing astFlow array`);
    assert.ok(preset.astFlow.length >= 3, `Preset ${preset.id} astFlow should have at least 3 nodes`);
    assert.ok(preset.branches.safe, `Preset ${preset.id} missing safe branch`);
    assert.ok(preset.branches.error, `Preset ${preset.id} missing error branch`);
    assert.ok(preset.rootCause.headline, `Preset ${preset.id} missing rootCause headline`);
    assert.ok(preset.rootCause.why, `Preset ${preset.id} missing rootCause why`);
    assert.ok(Array.isArray(preset.rootCause.evidence), `Preset ${preset.id} missing evidence array`);
    assert.ok(preset.voice.transcript, `Preset ${preset.id} missing voice transcript`);
    assert.ok(preset.voice.fullExplanation, `Preset ${preset.id} missing voice fullExplanation`);
    assert.ok(preset.fix.description, `Preset ${preset.id} missing fix description`);
  }
});

test('Zero emdashes constraint verification', () => {
  for (const preset of ERROR_PRESETS) {
    const raw = JSON.stringify(preset);
    assert.ok(!raw.includes('—'), `Preset ${preset.id} contains prohibited emdash`);
  }

  const rawStory = JSON.stringify(STORY_DATA);
  assert.ok(!rawStory.includes('—'), `Story data contains prohibited emdash`);
});

test('Story data structure integrity', () => {
  assert.ok(STORY_DATA.hero.title, 'Story should have hero title');
  assert.ok(STORY_DATA.hero.quote, 'Story should have testimonial quote');
  assert.ok(Array.isArray(STORY_DATA.stats), 'Story should have stats array');
  assert.equal(STORY_DATA.stats.length, 4, 'Story should have 4 impact stats');
});
