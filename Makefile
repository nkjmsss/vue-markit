cidfile := $(CURDIR)/.cid

ifeq (exec,$(firstword $(MAKECMDGOALS)))
  EXEC_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(EXEC_ARGS):;@:)
endif

define docker
	docker run \
		--rm \
		-v $(CURDIR):/src \
		-e HOST=0.0.0.0 \
		-p 3000:3000 \
		-w="/src" \
		--cidfile="${cidfile}" \
		node:11.9.0-alpine \
		$1 \
	; rm -rf ${cidfile}
endef

.PHONY: init
init:
	$(call docker,npm install)

.PHONY: dev
dev:
	$(call docker,npm run dev)

.PHONY: exec
exec:
	docker exec -it $(shell cat ${cidfile}) ${EXEC_ARGS}

.PHONY: cleanup
cleanup:
	rm -rf node_modules/.cache/hard-source
