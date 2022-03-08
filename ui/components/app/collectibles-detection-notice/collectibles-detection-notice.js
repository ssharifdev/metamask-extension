import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '../../ui/box';
import Dialog from '../../ui/dialog';
import Typography from '../../ui/typography/typography';
import {
  COLORS,
  TYPOGRAPHY,
  TEXT_ALIGN,
  FONT_WEIGHT,
  DISPLAY,
  FLEX_DIRECTION,
  BLOCK_SIZES,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import Button from '../../ui/button';
import { EXPERIMENTAL_ROUTE } from '../../../helpers/constants/routes';
import { setCollectiblesDetectionNoticeDismissed } from '../../../store/actions';
import {
  ENVIRONMENT_TYPE_FULLSCREEN,
  ENVIRONMENT_TYPE_POPUP,
} from '../../../../shared/constants/app';
import { getEnvironmentType } from '../../../../app/scripts/lib/util';

export default function CollectiblesDetectionNotice() {
  const t = useI18nContext();
  const history = useHistory();
  const environmentType = getEnvironmentType();

  return (
    <Box className="collectibles-detection-notice">
      <Dialog type="message" className="collectibles-detection-notice__message">
        {environmentType === ENVIRONMENT_TYPE_POPUP && (
          <button
            onClick={() => setCollectiblesDetectionNoticeDismissed()}
            className="fas fa-times collectibles-detection-notice__message__close-button"
          />
        )}
        <Box display={DISPLAY.FLEX} width={BLOCK_SIZES.MAX}>
          <Box paddingTop={1}>
            <i
              style={{ fontSize: '1rem', color: '#037DD6' }}
              className="fa fa-info-circle"
            />
          </Box>
          <Box paddingLeft={2}>
            <Typography
              color={COLORS.TEXT_DEFAULT}
              align={TEXT_ALIGN.LEFT}
              variant={TYPOGRAPHY.H7}
              fontWeight={FONT_WEIGHT.BOLD}
            >
              {t('newNFTsDetected')}
            </Typography>
            {environmentType === ENVIRONMENT_TYPE_FULLSCREEN ? (
              <Box
                display={DISPLAY.INLINE_FLEX}
                flexDirection={FLEX_DIRECTION.ROW}
              >
                <Typography
                  color={COLORS.BLACK}
                  align={TEXT_ALIGN.LEFT}
                  variant={TYPOGRAPHY.H7}
                >
                  {t('newNFTDetectedMessage')}
                </Typography>
                <Box
                  display={DISPLAY.INLINE_FLEX}
                  flexDirection={FLEX_DIRECTION.ROW}
                  className="collectibles-detection-notice__message__fullscreen-links"
                >
                  <Button
                    type="link"
                    onClick={() => {
                      history.push(EXPERIMENTAL_ROUTE);
                    }}
                    className="collectibles-detection-notice__message__settings-link"
                  >
                    {t('selectNFTPrivacyPreference')}
                  </Button>
                  <Button
                    type="link"
                    onClick={() => setCollectiblesDetectionNoticeDismissed()}
                    className="collectibles-detection-notice__message__dismiss-link"
                    data-testid="collectibles-detection-notice-dismiss"
                  >
                    {t('dismiss')}
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Typography
                  color={COLORS.BLACK}
                  align={TEXT_ALIGN.LEFT}
                  variant={TYPOGRAPHY.H7}
                  boxProps={{ marginBottom: 4 }}
                >
                  {t('newNFTDetectedMessage')}
                </Typography>
                <Button
                  type="link"
                  onClick={() => {
                    history.push(EXPERIMENTAL_ROUTE);
                  }}
                  className="collectibles-detection-notice__message__link"
                >
                  {t('selectNFTPrivacyPreference')}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
